'use client'
import { ChangeEvent, SyntheticEvent, useEffect } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import { soorahList } from '@/assets/soorah-list-object'
import { translatorList } from '@/assets/translatorList'
import { useSearchFormStore } from '@/store/searchFormStore'
import { ViewProps } from '@/utility/getView/getView.types'

export const Form = () => {
  const router = useRouter()

  const params = useParams()
  const searchParams = useSearchParams()

  const soorahParam = Number(params?.soorah?.toString()) || null
  const ayahParam = Number(params?.ayah?.toString()) || null
  const queryParam = params?.search ? decodeURIComponent(params?.search.toString()) : null
  const translatorParam = Number(
    searchParams?.get('t') || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR
  )

  const {
    initializeState,
    setSoorah,
    setAyah,
    setQuery,
    setTranslator,
    soorah,
    ayah,
    query,
    translator,
    view,
  } = useSearchFormStore()

  useEffect(() => {
    initializeState({
      soorah: soorahParam,
      ayah: ayahParam,
      query: queryParam,
      translator: translatorParam,
    })
  }, [soorahParam, ayahParam, queryParam, translatorParam, initializeState])

  const onHandleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target

    switch (name) {
      case 'soorah':
        setSoorah(Number(value))
        break
      case 'ayah':
        setAyah(Number(value))
        break
      case 'search':
        setQuery(value)
        break
      case 'translator':
        setTranslator(Number(value))
        break
      default:
        break
    }
  }

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    switch (view) {
      case ViewProps.SEARCH:
        router.push(`/search/${query}?t=${translator}`)
        break
      case ViewProps.SOORAH:
        router.push(`/${soorah}?t=${translator}`)
        break
      case ViewProps.AYAH:
        router.push(`/${soorah}/${ayah}?t=${translator}`)
        break
      case ViewProps.EMPTY:
      default:
        router.push('/')
    }
  }

  return (
    <form
      id="search"
      className="alert alert-gray mb-6 space-y-2"
      acceptCharset="UTF-8"
      onSubmit={onSubmit}
    >
      <div className="grid grid-cols-12 items-center gap-x-4 gap-y-2">
        <select
          className="form-control col-span-7 focus:border-gray-500 focus:bg-white focus:outline-none active:border-gray-500 active:outline-none"
          name="soorah"
          value={soorah ?? 0}
          onChange={onHandleChange}
        >
          <option value="0">Surələr:</option>
          {soorahList.map(({ id, title }) => (
            <option value={id} key={id}>
              {`${title} surəsi. ${id}`}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Ayə"
          className="form-control col-span-2"
          name="ayah"
          size={3}
          maxLength={3}
          min={0}
          max={286}
          value={ayah || ''}
          onChange={onHandleChange}
        />

        <select
          className="form-control col-span-3 text-center focus:border-gray-500 focus:bg-white focus:outline-none active:border-gray-500 active:outline-none"
          name="translator"
          value={translator}
          onChange={onHandleChange}
        >
          {translatorList.map((soorahTitle, index) => (
            <option value={index + 1} key={index}>
              {soorahTitle}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Kəlmə"
          className="form-control col-span-7"
          name="search"
          value={query || ''}
          onChange={onHandleChange}
        />

        <button
          className="col-span-5 rounded-md bg-green-200 px-3 py-2 text-green-900 shadow hover:bg-green-300"
          type="submit"
        >
          Axtar
        </button>
      </div>
    </form>
  )
}
