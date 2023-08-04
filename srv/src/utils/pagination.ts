export const paginationFn = (totalRecords: number,options:{resultsPerPage: number, pageNumber: number}) => {
    const totalPages = Math.ceil(totalRecords / options.resultsPerPage)
    return {
    totalRecords,
    totalPages,
    currentPage: options.pageNumber,
    recordsPerPage: options.resultsPerPage
  }
}