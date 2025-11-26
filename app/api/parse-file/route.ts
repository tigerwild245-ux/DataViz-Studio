// API Route: Parse uploaded files
// Handles Excel, CSV, PDF, Word, PowerPoint, JSON parsing

import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

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
