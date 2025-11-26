// API Route: Parse uploaded files
// Handles Excel, CSV, PDF, Word, PowerPoint, JSON parsing

import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import JSZip from 'jszip';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        const filename = file.name;
        const ext = filename.split('.').pop()?.toLowerCase();

        // Get file buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        let parsedData: any = null;
        let fileType = '';

        // Parse based on file type
        switch (ext) {
            case 'xlsx':
            case 'xls':
                parsedData = await parseExcel(buffer);
                fileType = 'excel';
                break;

            case 'csv':
                parsedData = await parseCSV(buffer);
                fileType = 'csv';
                break;

            case 'pdf':
                parsedData = await parsePDF(buffer);
                fileType = 'pdf';
                break;

            case 'docx':
            case 'doc':
                parsedData = await parseWord(buffer);
                fileType = 'word';
                break;

            case 'pptx':
            case 'ppt':
                parsedData = await parsePowerPoint(buffer);
                fileType = 'powerpoint';
                break;

            case 'json':
                parsedData = JSON.parse(buffer.toString('utf-8'));
                fileType = 'json';
                break;

            default:
                return NextResponse.json(
                    { error: `Unsupported file type: ${ext}` },
                    { status: 400 }
                );
        }

        return NextResponse.json({
            success: true,
            filename,
            fileType,
            data: parsedData,
        });

    } catch (error: any) {
        console.error('Parse error:', error);
        return NextResponse.json(
            {
                error: 'Failed to parse file',
                details: error.message
            },
            { status: 500 }
        );
    }
}

// Excel Parser
async function parseExcel(buffer: Buffer) {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const result: any = {};

    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        result[sheetName] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    });

    return result;
}

// CSV Parser
async function parseCSV(buffer: Buffer): Promise<any> {
    return new Promise((resolve, reject) => {
        const csvString = buffer.toString('utf-8');

        Papa.parse(csvString, {
            complete: (results) => resolve(results.data),
            error: (error) => reject(error),
            skipEmptyLines: true,
        });
    });
}

// PDF Parser
async function parsePDF(buffer: Buffer) {
    const data = await pdf(buffer);

    return {
        text: data.text,
        numPages: data.numpages,
        info: data.info,
        metadata: data.metadata,
    };
}

// Word Parser
async function parseWord(buffer: Buffer) {
    const result = await mammoth.extractRawText({ buffer });

    return {
        text: result.value,
        messages: result.messages,
    };
}

// PowerPoint Parser
async function parsePowerPoint(buffer: Buffer) {
    try {
        const zip = await JSZip.loadAsync(buffer);
        const slides: string[] = [];

        // Extract slide content from PPTX
        const slideFiles = Object.keys(zip.files).filter(
            name => name.startsWith('ppt/slides/slide') && name.endsWith('.xml')
        );

        for (const slideFile of slideFiles) {
            const content = await zip.files[slideFile].async('text');
            // Extract text from XML (basic extraction)
            const textMatches = content.match(/<a:t>([^<]+)<\/a:t>/g);
            if (textMatches) {
                const slideText = textMatches
                    .map(match => match.replace(/<\/?a:t>/g, ''))
                    .join(' ');
                slides.push(slideText);
            }
        }

        return {
            slides,
            slideCount: slides.length,
        };
    } catch (error) {
        console.error('PowerPoint parsing error:', error);
        return {
            slides: [],
            slideCount: 0,
            error: 'Failed to parse PowerPoint file',
        };
    }
}
