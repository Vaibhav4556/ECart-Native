import {useMemo} from 'react';

const range = (start: any, end: any) => {
  const length = end - start + 1;

  return Array.from({length}, (_, index) => index + start);
};

const usePagination = ({totalCount, currentPage, pageSize}: any) => {
  const paginationRange = useMemo(() => {
    const siblingCount = 1;
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 4;

    //case 1: if totalPageNumber is less than totalPageCount

    if (totalPageNumbers > totalPageCount) {
      return range(1, totalPageCount);
    }

    //calculate left and right siblings within range 1 and totalPageCount

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    //To show dots or not

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    //case 2: no left dots to show but to show right dots

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 2 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, 'DOTS', totalPageCount];
    }

    //case 3: left dots to show nut no right dots to show
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 2 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, 'DOTS', ...rightRange];
    }

    //case 4: to show left and right dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex];
    }
  }, [totalCount, pageSize, currentPage]);
  return paginationRange;
};

export default usePagination;
