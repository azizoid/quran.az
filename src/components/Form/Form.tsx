'use client'
import { ChangeEvent, SyntheticEvent, useState, type JSX } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import { soorahList } from '@/assets/soorah-list-object'
import { translatorList } from '@/assets/translatorList'
import { FormProps, getView } from '@/utility/getView/getView'

export const Form = (): JSX.Element => {
  const router = useRouter()

  const params = useParams()
  const searchParams = useSearchParams()

  const soorah = Number(params?.soorah?.toString()) || null
  const ayah = Number(params?.ayah?.toString()) || null
  const query = params?.search ? decodeURIComponent(params?.search.toString()) : null
  const translator = Number(searchParams?.get('t') || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR)

  const [state, setState] = useState<FormProps>(() =>
    getView({ s: soorah, a: ayah, q: query, t: translator })
  )

  const onHandleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target

    switch (name) {
      case 'soorah':
        setState((prev) => ({
          ...prev,
          s: Number(value),
          a: null,
          q: null,
          view: name,
        }))
        break
      case 'ayah':
        setState((prev) => ({
          ...prev,
          s: Number(prev.s),
          a: Number(value),
          q: null,
          view: name,
        }))
        break
      case 'search':
        setState((prev) => ({
          ...prev,
          s: null,
          a: null,
          q: value,
          view: name,
        }))
        break
      case 'translator':
        setState((prev) => ({ ...prev, t: Number(value) }))
        break
    }
  }

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    const submitValue = getView(state)

    switch (submitValue.view) {
      case 'search':
        router.push(`/search/${submitValue.q}?t=${submitValue.t}`)
        break
      case 'soorah':
        router.push(`/${submitValue.s}?t=${submitValue.t}`)
        break
      case 'ayah':
        router.push(`/${submitValue.s}/${submitValue.a}?t=${submitValue.t}`)
        break
      case 'empty':
      default:
        router.push('/')
    }
  }

  return (
    <form
      id="search"
      className="space-y-2 mb-6 alert alert-gray"
      acceptCharset="UTF-8"
      onSubmit={onSubmit}
    >
      <div className="grid grid-cols-12 items-center gap-x-4 gap-y-2">
        <select
          className="form-control col-span-7 focus:outline-none focus:bg-white focus:border-gray-500 active:outline-none active:border-gray-500"
          name="soorah"
          value={state?.s ?? 0}
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
          value={state?.a || ''}
          onChange={onHandleChange}
        />

        <select
          className="form-control col-span-3 text-center focus:outline-none focus:bg-white focus:border-gray-500 active:outline-none active:border-gray-500"
          name="translator"
          value={state?.t}
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
          value={state?.q || ''}
          onChange={onHandleChange}
        />

        <button className="btn btn-success col-span-5" type="submit">
          Axtar
        </button>
      </div>
    </form>
  )
}
