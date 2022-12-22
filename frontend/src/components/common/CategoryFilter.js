import React, { useState } from 'react'

const CategoryFilter = (props) => {
    const { categories, handleFilters } = props
    const [checkedCategories] = useState(new Set())
    const update = (idCategory) => {
        if (checkedCategories.has(idCategory))
            checkedCategories.delete(idCategory)
        else
            checkedCategories.add(idCategory)
        handleFilters('Category_id', Array.from(checkedCategories))
    }
    return (
        <div class="card">
            <div class="card-heading">
                <a data-toggle="collapse" data-target="#collapseOne">Categories</a>
            </div>
            <div id="collapseOne" class="collapse show" data-parent="#accordionExample">
                <div class="card-body">
                    <div class="shop__sidebar__categories">
                        <ul>
                            {
                                categories.map((category, i) => (
                                    <li key={i} className='list-unstyled my-3'>
                                        <input onClick={() => update(category.category_id)} value={category.category_id} type="checkbox" name='' id={i} />
                                        <label htmlFor={i} className='form-check-label px-3'>{category.category_name}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryFilter