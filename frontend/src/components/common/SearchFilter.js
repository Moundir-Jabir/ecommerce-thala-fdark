import React, {useState} from 'react'

const SearchFilter = (props) => {
    const [search, setSearch] = useState('')
    const update = (e) => {
        setSearch(e.target.value)
    }
    const submit = (e) => {
        e.preventDefault()
        props.handleFilters('nameFilter', search)
    }
    return (
        <div class="shop__sidebar__search">
            <form onSubmit={submit}>
                <input type="text" placeholder="Search..." onChange={update} />
                <button type="submit"><span class="icon_search"></span></button>
            </form>
        </div>
    )
}

export default SearchFilter