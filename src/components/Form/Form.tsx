'use client'
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

import { soorahList } from '@/assets/soorah-list-object'
import { translatorList } from '@/assets/translatorList'
import { getView, initialStateProps } from '@/utility/getView/getView'
import { ViewProps, type FormProps } from '@/utility/getView/getView.types'

export const Form = () => {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  // Memoize URL parameters to prevent unnecessary recalculations
  const urlParams = useMemo(() => ({
    soorah: Number(params?.soorah?.toString()) || null,
    ayah: Number(params?.ayah?.toString()) || null,
    query: params?.search ? decodeURIComponent(params?.search.toString()) : null,
    translator: Number(searchParams?.get('t') || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR),
  }), [params?.soorah, params?.ayah, params?.search, searchParams])

  const [state, setState] = useState<FormProps>(initialStateProps)

  // Update state when URL parameters change
  useEffect(() => {
    setState(getView(urlParams))
  }, [urlParams])

  // Memoize the change handler to prevent recreation on every render
  const onHandleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target

    setState(prev => {
      switch (name) {
        case ViewProps.SOORAH:
          return {
            ...prev,
            soorah: Number(value),
            ayah: null,
            query: null,
            view: name,
          }
        case ViewProps.AYAH:
          return {
            ...prev,
            soorah: Number(prev.soorah),
            ayah: Number(value),
            query: null,
            view: name,
          }
        case ViewProps.QUERY:
          return {
            ...prev,
            soorah: null,
            ayah: null,
            query: value,
            view: name,
          }
        case 'translator':
          return { ...prev, translator: Number(value) }
        default:
          return prev
      }
    })
  }, [])

  // Memoize the submit handler
  const onSubmit = useCallback((event: SyntheticEvent) => {
    event.preventDefault()

    const submitValue = getView(state)

    switch (submitValue.view) {
      case ViewProps.QUERY:
        router.push(`/search/${submitValue.query}?t=${submitValue.translator}`)
        break
      case ViewProps.SOORAH:
        router.push(`/${submitValue.soorah}?t=${submitValue.translator}`)
        break
      case ViewProps.AYAH:
        router.push(`/${submitValue.soorah}/${submitValue.ayah}?t=${submitValue.translator}`)
        break
      case ViewProps.EMPTY:
      default:
        router.push('/')
    }
  }, [state, router])

  // Memoize the form JSX to prevent unnecessary re-renders
  const formContent = useMemo(() => (
    <div className="grid grid-cols-12 items-center gap-x-4 gap-y-2">
      <select
        className="form-control col-span-7 focus:border-gray-500 focus:bg-white focus:outline-hidden active:border-gray-500 active:outline-hidden"
        name={ViewProps.SOORAH}
        value={state.soorah || 0}
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
        name={ViewProps.AYAH}
        size={3}
        maxLength={3}
        min={0}
        max={286}
        value={state.ayah || ''}
        onChange={onHandleChange}
      />

      <select
        className="form-control col-span-3 text-center focus:border-gray-500 focus:bg-white focus:outline-hidden active:border-gray-500 active:outline-hidden"
        name="translator"
        value={state.translator || 0}
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
        name={ViewProps.QUERY}
        value={state.query ?? ''}
        onChange={onHandleChange}
      />

      <button
        type="submit"
        className="col-span-5 rounded-md bg-green-200 px-3 py-2 text-green-900 shadow-sm hover:bg-green-300"
      >
        Axtar
      </button>
    </div>
  ), [state, onHandleChange])

  return (
    <form
      id="search"
      className="alert alert-gray mb-6 space-y-2"
      acceptCharset="UTF-8"
      onSubmit={onSubmit}
    >
      {formContent}
    </form>
  )
}