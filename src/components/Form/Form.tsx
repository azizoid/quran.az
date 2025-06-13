'use client'
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import { soorahList } from '@/assets/soorah-list-object'
import { translatorList } from '@/assets/translatorList'
import { getView, initialStateProps } from '@/utility/getView/getView'
import { ViewProps, type FormProps } from '@/utility/getView/getView.types'

export const Form = () => {
  const router = useRouter()

  const params = useParams()
  const searchParams = useSearchParams()

  const soorah = Number(params?.soorah?.toString()) || null
  const ayah = Number(params?.ayah?.toString()) || null
  const query = params?.search ? decodeURIComponent(params?.search.toString()) : null
  const translator = Number(searchParams?.get('t') || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR)

  const [state, setState] = useState<FormProps>(initialStateProps)

  useEffect(() => {
    setState(getView({ soorah, ayah, query, translator }))
  }, [ayah, query, soorah, translator])

  const onHandleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target

    switch (name) {
      case ViewProps.SOORAH:
        setState((prev) => ({
          ...prev,
          soorah: Number(value),
          ayah: null,
          query: null,
          view: name,
        }))
        break
      case ViewProps.AYAH:
        setState((prev) => ({
          ...prev,
          soorah: Number(prev.soorah),
          ayah: Number(value),
          query: null,
          view: name,
        }))
        break
      case ViewProps.QUERY:
        setState((prev) => ({
          ...prev,
          soorah: null,
          ayah: null,
          query: value,
          view: name,
        }))
        break
      case 'translator':
        setState((prev) => ({ ...prev, translator: Number(value) }))
        break
    }
  }

  const onSubmit = (event: SyntheticEvent) => {
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
    </form>
  )
}