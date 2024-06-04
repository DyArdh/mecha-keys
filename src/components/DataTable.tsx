import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from '@tanstack/react-table';
import React from 'react';

import { resultWPType } from '@/types/weightedProduct.type';

const columnHelper = createColumnHelper<resultWPType>();

const columns = [
    columnHelper.accessor('id', {
        header: () => 'ID'
    }),
    columnHelper.accessor('name', {
        header: () => 'Name'
    }),
    columnHelper.accessor('bottom_out_force', {
        header: () => 'Bottom Out Force'
    }),
    columnHelper.accessor('actuation_travel', {
        header: () => 'Actuation Travel'
    }),
    columnHelper.accessor('total_travel', {
        header: () => 'Total Travel'
    }),
    columnHelper.accessor('lube_id', {
        header: () => 'Lube ID'
    }),
    columnHelper.accessor('price', {
        header: () => 'Price'
    }),
    columnHelper.accessor('totalS', {
        header: () => 'TotalS'
    }),
    columnHelper.accessor('v', {
        header: () => 'V'
    }),
    columnHelper.accessor('rank', {
        header: () => 'Rank'
    })
];

const DataTable: React.FC<{ result: resultWPType[]; }> = ({ result }) => {
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });

    const table = useReactTable({
        data: result,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { pagination },
        onPaginationChange: setPagination
    });

    return (
        <div className="container mx-auto px-4 pt-16 md:px-[110px] md:pt-20">
            <h1 className="text-2xl font-bold md:text-3xl">Hasil Rekomendasi</h1>
            <div className="mt-5 overflow-x-auto rounded-lg border shadow-md">
                <table className="w-full overflow-hidden rounded-lg shadow-md">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="bg-gray-200 px-4 py-2">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-t border-gray-200">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-2">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="h-2" />
            <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                    className="rounded border px-4 py-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="rounded border px-4 py-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="rounded border px-4 py-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="rounded border px-4 py-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                        className="w-16 rounded border p-1"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                    className="rounded border p-1"
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-2">
                Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
                {table.getCoreRowModel().rows.length.toLocaleString()} Rows
            </div>
        </div>
    );
};

export default DataTable;
