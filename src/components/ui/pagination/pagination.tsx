import { useEffect, useState } from 'react'

import { ArrowLeft, ArrowRight } from '@/assets/icons'
import { Button, Select } from '@/components/ui'

import s from './pagination.module.scss'

import { usePagination } from './usePagination'

type PaginationProps = {
  onChangePage: (page: number, value: number) => void
  page: number
  select: boolean
  totalCount: number
  value: number
}

export const Pagination = ({ onChangePage, select, totalCount, ...props }: PaginationProps) => {
  const [value, setValue] = useState(props.value)
  const [page, setPage] = useState(props.page)

  // const lastTotalCount = Math.ceil(totalCount / value)

  const {
    handleMainPageClicked,
    handleNextPageClicked,
    handlePreviousPageClicked,
    isFirstPage,
    isLastPage,
    paginationRange,
  } = usePagination({
    count: totalCount,
    onChange: setPage,
    page,
  })

  useEffect(() => {
    onChangePage(page, value)
  }, [value, page, onChangePage])

  return (
    <div className={s.container}>
      <div className={s.root}>
        <Button disabled={isFirstPage} onClick={handlePreviousPageClicked} variant={'link'}>
          <ArrowLeft />
        </Button>
        <div className={s.pagination}>
          {paginationRange.map((p, index) => {
            if (typeof p !== 'number') {
              return (
                <span className={s.dots} key={index}>
                  &#8230;
                </span>
              )
            }

            return (
              <div
                className={p === props.page ? `${s.active} ${s.page}` : s.page}
                key={index}
                onClick={() => handleMainPageClicked(p)}
              >
                {p}
              </div>
            )
          })}
        </div>
        <Button disabled={isLastPage} onClick={handleNextPageClicked} variant={'link'}>
          <ArrowRight />
        </Button>
      </div>
      {select && (
        <div className={s.select}>
          <span>Показать</span>
          <div>
            <Select
              options={[
                { title: '5', value: 5 },
                { title: '10', value: 10 },
                { title: '15', value: 15 },
              ]}
              setValue={setValue}
              value={value}
            />
          </div>
          <span>на странице</span>
        </div>
      )}
    </div>
  )
}
