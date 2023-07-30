import {useEffect, useMemo, useState} from "react";
import {useSortBy, useTable, usePagination} from "react-table";

function ReactTableCustom({...props}) {
  const [showIndex, setShowIndex] = useState(false);
  const [paginate, setPaginate] = useState(false);
  const [tableHeaderShow, setTableHeaderShow] = useState(true);
  const [data, setData] = useState([]);

  // let data = useMemo(() => props.data[0][props.data[1]]);
  const columns = useMemo(() => props.columns);
  const loading = useMemo(() => props.loading);

  const currentPage = useMemo(() => props.paginateValue?.currentPage);
  const totalPage = useMemo(() => props.paginateValue?.lastPage);
  const total_count = useMemo(() => props.paginateValue?.total);

  useEffect(() => {
    let data = [];
    if (props?.data?.length) {
      data = props.data;
    }
    setData(data);
  }, [props.data]);

  useEffect(() => {
    setShowIndex(props.sorting);
  }, [props.sorting]);
  useEffect(() => {
    setTableHeaderShow(props.tableHeaderShow);
  }, [props.tableHeaderShow]);

  useEffect(() => {
    setPaginate(props.paginate);
  }, [props.paginate]);

  const tableInstance = useTable(
    {
      columns,
      data,
      disableSortBy: !showIndex,
      initialState: {pageIndex: 0},
      manualPagination: !paginate,
    },
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,

    prepareRow,

    //paginate
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {pageIndex, pageSize},
  } = tableInstance;

  const Paginate = () => {
    return (
      <>
        {paginate && data.length !== 0 && (
          <>
            <div className="pagination gap-2 justify-content-end align-items-center pt-3">
              <span className="small pe-1 text-muted">
                <strong>
                  Page {currentPage} of {totalPage} Total {total_count}
                </strong>{" "}
              </span>
              <span
                className={`small  co-secondary ${
                  currentPage == 1 ? "co-primary restrict" : "pointer"
                }`}
                onClick={() => {
                  props.firstPage();
                }}
                disabled={currentPage == 1}
              >
                {
                  <>
                    <i className="bi bi-chevron-double-left"></i>
                  </>
                }
              </span>{" "}
              <span
                className={`small  co-secondary ${
                  currentPage == 1 ? "co-primary restrict" : "pointer"
                }`}
                onClick={() => {
                  props.prevPage();
                }}
                disabled={currentPage == 1}
              >
                {
                  <>
                    <i className="bi bi-chevron-left"></i>
                  </>
                }
              </span>{" "}
              <span
                className={`small co-secondary ${
                  currentPage == totalPage ? "co-primary restrict" : "pointer"
                }`}
                onClick={() => {
                  props.nextPage();
                }}
                disabled={currentPage == totalPage}
              >
                {
                  <>
                    <i className="bi bi-chevron-right"></i>
                  </>
                }
              </span>{" "}
              <span
                className={`small co-secondary ${
                  currentPage == totalPage ? "co-primary restrict" : "pointer"
                }`}
                onClick={() => {
                  props.lastPage();
                }}
                disabled={currentPage == totalPage}
              >
                {
                  <>
                    <i className="bi bi-chevron-double-right"></i>
                  </>
                }
              </span>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <>
      {props.headerShow && (
        <div className="card border-0 rounded-0 rounded-top table-custom-head border-bottom">
          <div className="card-body">
            {props.header && (
              <>
                <h5 className="table-custom-header fw-semibold">
                  {props.header}
                </h5>
              </>
            )}
          </div>
        </div>
      )}
      {loading ? (
        <>
          <div
            className={`card border-0  ${
              props.headerShow ? "rounded-0 rounded-bottom" : "rounded"
            } `}
          >
            <div className="card-body">
              <div className="fs-3 text-center">Loading</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="">
            <pre className="d-none">
              <code>
                {JSON.stringify(
                  {
                    pageIndex,
                    pageSize,
                    pageCount,
                    canNextPage,
                    canPreviousPage,
                  },
                  null,
                  2
                )}
              </code>
            </pre>

            {props.paginatePosition == "top" && (
              <>
                <div className=" mb-3 pe-3">
                  <Paginate />
                </div>
              </>
            )}
            <div className="overflow-auto">
              <table className="table custom-table" {...getTableProps}>
                {tableHeaderShow && (
                  <thead>
                    {
                      // Loop over the header rows
                      headerGroups.map((headerGroup, index) => (
                        // Apply the header row props
                        <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                          {
                            // Loop over the headers in each row
                            headerGroup.headers.map((column, index) => (
                              // Apply the header cell props
                              <th
                                key={index}
                                {...column.getHeaderProps(
                                  column.getSortByToggleProps()
                                )}
                                className={`data_table_th_hover ${
                                  column.classNameHeader &&
                                  column.classNameHeader
                                }`}
                              >
                                <div className="data_table_th_custom_head">
                                  {column.isSorted ? (
                                    column.isSortedDesc ? (
                                      <>
                                        {column.render("Header")}
                                        <div>
                                          <i className="bi bi-caret-up-fill"></i>
                                          <i className="bi bi-caret-down-fill"></i>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="data_table_th_custom_head">
                                          {column.render("Header")}
                                          <div>
                                            <i className="bi bi-caret-down-fill"></i>
                                            <i className="bi bi-caret-up-fill"></i>
                                          </div>
                                        </div>
                                      </>
                                    )
                                  ) : (
                                    // Render the header
                                    column.render("Header")
                                  )}
                                </div>
                              </th>
                            ))
                          }
                        </tr>
                      ))
                    }
                  </thead>
                )}

                {data.length ? (
                  <>
                    <tbody {...getTableBodyProps()}>
                      {
                        // Loop over the table rows
                        page.map((row, index) => {
                          // Prepare the row for display
                          prepareRow(row);
                          return (
                            // Apply the row props
                            <tr
                              className={`${props.onClick && "pointer"}`}
                              key={index}
                              {...row.getRowProps()}
                              onClick={() => {
                                props.onClick && props.onClick(row.original);
                              }}
                            >
                              {
                                // Loop over the rows cells
                                row.cells.map((cell, index) => {
                                  // Apply the cell props
                                  return (
                                    <td
                                      key={index}
                                      {...cell.getCellProps()}
                                      className={` ${
                                        cell.column.classNameCell &&
                                        cell.column.classNameCell
                                      }`}
                                    >
                                      {
                                        // Render the cell contents
                                        cell.render("Cell")
                                      }
                                    </td>
                                  );
                                })
                              }
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </>
                ) : (
                  ""
                )}
              </table>
              {!data.length ? (
                <>
                  <div className="text-muted fs-2 text-center">
                    Record Not Found
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            {props.paginatePosition == "bottom" && (
              <>
                <div className=" pe-3">
                  <Paginate />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default ReactTableCustom;

export const paginateCount = ({limit = 10, offset = 0, total = 0}) => {
  // //console.log(limit, offset, total);
  return {
    currentPage: (offset > 0 ? parseInt(offset / limit) : 0) + 1,
    total: total,
    lastPage: total % limit == 0 ? total / limit : parseInt(total / limit) + 1,
  };
};

export const lastOffset = ({limit = 10, offset = 0, total = 0}) => {
  const devi = total / limit;
  let page = 0;
  page = total % limit == 0 ? (devi - 1) * 10 : parseInt(devi) * 10;
  return page;
};

export const paginate = ({limit, offset, total, pageLimit}) => {
  return {
    first: {
      offset: 0,
      limit: pageLimit,
    },
    next: {
      offset: offset + 10,
      limit: pageLimit,
    },
    prev: {
      offset: offset - 10,
      limit: pageLimit,
    },
    last: {
      offset: lastOffset({limit, offset, total}),
      limit: pageLimit,
    },
  };
};
