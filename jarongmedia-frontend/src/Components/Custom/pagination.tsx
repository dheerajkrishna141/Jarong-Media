"use client";

import type React from "react";
import { Button, Flex, HStack, Text, type ButtonProps } from "@chakra-ui/react";
import { useColorModeValue } from "../UI/color-mode";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export type PaginationProps = {
  /**
   * The current page number
   * @default 1
   */
  currentPage?: number;
  /**
   * The total number of pages
   */
  totalPages: number;
  /**
   * Number of always visible pages before and after the current page
   * @default 1
   */
  siblingCount?: number;
  /**
   * Callback fired when the page is changed
   */
  onChange?: (page: number) => void;
  /**
   * The color scheme of the pagination
   * @default "blue"
   */
  colorScheme?: string;
  /**
   * The size of the pagination buttons
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * The variant of the pagination buttons
   * @default "solid"
   */
  variant?: "outline" | "solid" | "ghost";
  /**
   * If true, the pagination will be disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * If true, the pagination will be centered
   * @default false
   */
  isCentered?: boolean;
  /**
   * If true, the pagination will show the first and last page buttons
   * @default true
   */
  showFirstLastButtons?: boolean;
  /**
   * If true, the pagination will show the previous and next page buttons
   * @default true
   */
  showPrevNextButtons?: boolean;
};

const DOTS = "...";

/**
 * Generate an array of page numbers to display in the pagination component
 */
const generatePaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | string)[] => {
  // Calculate the range of pages to show
  const totalPageNumbers = siblingCount * 2 + 3; // siblings on both sides + current + first + last

  // If the number of pages is less than the page numbers we want to show
  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // No dots to show, just show the middle pages
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 1 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, DOTS, totalPages];
  }

  // No right dots to show, but left dots to be shown
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 1 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [firstPageIndex, DOTS, ...rightRange];
  }

  // Both left and right dots to be shown
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  return [];
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages,
  siblingCount = 1,
  onChange,
  colorScheme = "blue",
  size = "md",
  variant = "solid",
  isDisabled = false,
  isCentered = false,
  showFirstLastButtons = true,
  showPrevNextButtons = true,
}) => {
  const paginationRange = generatePaginationRange(
    currentPage,
    totalPages,
    siblingCount
  );

  // If there are less than 2 pages, don't render pagination
  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    onChange?.(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    handlePageChange(1);
  };

  const handleLast = () => {
    handlePageChange(totalPages);
  };

  const bgColor = "white";
  const color = useColorModeValue("gray.700", "whiteAlpha.900");
  const hoverBgColor = useColorModeValue("gray.100", "whiteAlpha.300");

  // Button styles
  const activeStyle: ButtonProps = {
    bg: `${colorScheme}.500`,
    color: "white",
    _hover: {
      bg: `${colorScheme}.600`,
    },
  };

  const inactiveStyle: ButtonProps = {
    bg: bgColor,
    color: color,
    _hover: {
      bg: hoverBgColor,
    },
  };

  return (
    <Flex
      justifyContent={isCentered ? "center" : "flex-start"}
      alignItems="center"
      mt={4}
      mb={4}
    >
      <HStack gap="3">
        {showFirstLastButtons && (
          <Button
            aria-label="Go to first page"
            onClick={handleFirst}
            disabled={currentPage === 1 || isDisabled}
            size={size}
            variant={variant}
            {...inactiveStyle}
          >
            <LuChevronLeft size={16} />
            <LuChevronLeft size={16} style={{ marginLeft: -8 }} />
          </Button>
        )}

        {showPrevNextButtons && (
          <Button
            aria-label="Go to previous page"
            onClick={handlePrevious}
            disabled={currentPage === 1 || isDisabled}
            size={size}
            variant={variant}
            {...inactiveStyle}
          >
            <LuChevronLeft size={16} />
          </Button>
        )}

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <Button
                key={`dots-${index}`}
                disabled
                size={size}
                variant={variant}
                {...inactiveStyle}
              >
                <Text>...</Text>
              </Button>
            );
          }

          const page = pageNumber as number;
          const isActive = page === currentPage;

          return (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              size={size}
              variant={variant}
              {...(isActive ? activeStyle : inactiveStyle)}
            >
              {page}
            </Button>
          );
        })}

        {showPrevNextButtons && (
          <Button
            aria-label="Go to next page"
            onClick={handleNext}
            disabled={currentPage === totalPages || isDisabled}
            size={size}
            variant={variant}
            {...inactiveStyle}
          >
            <LuChevronRight size={16} />
          </Button>
        )}

        {showFirstLastButtons && (
          <Button
            aria-label="Go to last page"
            onClick={handleLast}
            disabled={currentPage === totalPages || isDisabled}
            size={size}
            variant={variant}
            {...inactiveStyle}
          >
            <LuChevronRight size={16} />
            <LuChevronRight size={16} style={{ marginLeft: -8 }} />
          </Button>
        )}
      </HStack>
    </Flex>
  );
};
