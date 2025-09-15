import { NextRequest, NextResponse } from 'next/server';
import { sheetStore } from '@/lib/state';
import { engine } from '@/lib/engine';
import { EvalRequestSchema, validateRequest } from '@/lib/validation';
import { toCellAddress } from '@/types';

// POST /api/eval - Evaluate a cell and return value + trace
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = validateRequest(EvalRequestSchema, body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { id, addr } = validation.data;
    const sheet = sheetStore.get(id);
    
    if (!sheet) {
      return NextResponse.json(
        { error: 'Sheet not found' },
        { status: 404 }
      );
    }

    const cellAddr = toCellAddress(addr);
    
    // TODO: Use engine to evaluate the cell
    // For now, return a stub response
    try {
      const result = engine.evaluateCell(sheet, cellAddr, true);
      
      return NextResponse.json({
        value: result.value,
        error: result.error,
        explain: result.explain
      });
    } catch (error) {
      // If evaluation fails, return the error
      return NextResponse.json({
        value: null,
        error: {
          code: 'EVAL',
          message: 'Failed to evaluate cell'
        }
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to evaluate cell' },
      { status: 500 }
    );
  }
}