import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { data } from "./assets/data.json";

const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Salary",
    accessor: "salary",
  },
];

const App = () => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
    pageCount,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="w-full h-full flex flex-col bg-slate-300 items-center justify-center">
      <h1 className="text-3xl font-medium underline"> -: React Table :- </h1>
      <table
        {...getTableProps()}
        className="w-2/3 m-5 bg-white text-black rounded-md flex  flex-col  justify-between"
      >
        <thead className="bg-black text-white rounded-md ">
          {headerGroups.map((hg) => (
            <tr
              {...hg.getHeaderGroupProps()}
              className="flex items-center justify-evenly h-8"
            >
              {hg.headers.map((header) => (
                <th
                  {...header.getHeaderProps(header.getSortByToggleProps())}
                  className="tracking-wider"
                >
                  {header.render("Header")}
                  {header.isSorted && (
                    <span>{header.isSortedDesc ? "⬆️" : "⬇️"}</span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="">
          {page.map((r) => {
            prepareRow(r);

            return (
              <tr
                {...r.getRowProps()}
                className="flex items-center justify-evenly h-8"
              >
                {r.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex w-full justify-between gap-2 px-56">
        <button
          disabled={pageIndex === 0}
          onClick={() => gotoPage(0)}
          className="bg-black py-1 px-3 text-white rounded-md"
        >
          First
        </button>

        <div className="flex gap-3 ">
          <button
            disabled={!canPreviousPage}
            onClick={previousPage}
            className="bg-black py-1 px-3 text-white rounded-md"
          >
            Prev
          </button>
          <span className=" font-semibold">
            {pageIndex + 1} of {pageCount}
          </span>
          <button
            disabled={!canNextPage}
            onClick={nextPage}
            className="bg-black py-1 px-3 text-white rounded-md "
          >
            Next
          </button>
        </div>

        <button
          disabled={pageIndex >= pageCount - 1}
          onClick={() => gotoPage(pageCount - 1)}
          className="bg-black py-1 px-3 text-white rounded-md"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default App;
