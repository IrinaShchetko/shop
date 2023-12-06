import _ from 'lodash'
import styles from './styles.module.css'
import { PaginationProps } from '../../shared/api/types'

export const AppPagination = ({ count, page, setPage, currentPage }: PaginationProps) => {
  const total = Math.ceil(count / page)
  const pages = _.range(1, total + 1)

  if (count <= 6) {
    return null
  }

  const cropPages = (pages: number[]) => {
    if (pages.length <= 5) {
      return pages
    }

    if (currentPage <= 2) {
      return [...pages.slice(0, 3), '...', total]
    }

    if (currentPage >= total - 2) {
      return [1, '...', ...pages.slice(total - 3, total)]
    }

    return [1, '...', ...pages.slice(currentPage - 1, currentPage + 1), '...', total]
  }

  const pagesCrop: (number | string)[] = cropPages(pages)

  return (
    <div className={styles.pagination}>
      <div className={`${styles.paginationItem} ${currentPage === 1 ? styles.disabled : ''}`} onClick={() => setPage(1)}>
        First
      </div>
      <div
        className={`${styles.paginationItem} ${currentPage === 1 ? styles.disabled : ''}`}
        onClick={() => {
          if (currentPage > 1) {
            setPage(currentPage - 1)
          }
        }}
      >
        Prev
      </div>
      {pagesCrop.map((pageNumber, index) => (
        <div
          key={index}
          className={`${styles.paginationItem} ${pageNumber === currentPage ? styles.active : ''}`}
          onClick={() => (typeof pageNumber === 'number' ? setPage(pageNumber) : null)}
        >
          {typeof pageNumber === 'number' ? pageNumber : '...'}
        </div>
      ))}
      <div
        className={`${styles.paginationItem} ${currentPage === total ? styles.disabled : ''}`}
        onClick={() => {
          if (currentPage < total) {
            setPage(currentPage + 1)
          }
        }}
      >
        Next
      </div>
      <div className={`${styles.paginationItem} ${currentPage === total ? styles.disabled : ''}`} onClick={() => setPage(total)}>
        Last
      </div>
    </div>
  )
}
