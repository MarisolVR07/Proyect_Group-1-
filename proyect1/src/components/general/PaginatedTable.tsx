import React from "react";
import ReactPaginate from "react-paginate";

interface PaginatedTableProps<T> {
  items: T[];
  itemsPerPage: number;
  header: React.ReactNode;
  row: (item: T) => React.ReactNode;
  onPageChange: (page: number) => void;
}

const PaginatedTable = <T extends object>({
  items,
  itemsPerPage,
  header,
  row,
  onPageChange,
}: PaginatedTableProps<T>) => {
  const [page, setPage] = React.useState(0);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
    onPageChange(selectedItem.selected);
  };

  const offset = page * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);

  return (
    <div className="p-4">
      <table className="w-full">
        <thead>{header}</thead>
        <tbody>{currentItems.map(row)}</tbody>
      </table>
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        breakLabel={"..."}
        pageCount={Math.ceil(items.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
        className="flex justify-center mt-4"
        pageClassName="px-2 py-1 border border-gray-300 rounded"
        previousClassName="px-2 py-1 border border-gray-300 rounded"
        nextClassName="px-2 py-1 border border-gray-300 rounded"
        breakClassName="px-2 py-1 border border-gray-300 rounded"
      />
    </div>
  );
};

export default PaginatedTable;