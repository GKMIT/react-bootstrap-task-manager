import { apiConfig } from './api';

export const crudService = {
    _get,
    _getAll,
    _create,
    _update,
    _delete
};
function _get(type, id) {
    return apiConfig.get(`/${type}/${id}`)
}
function _getAll(type, filterData) {
    let filters = []
    let filter
    if (filterData) {
        if (filterData.filters) {
            filterData.filters.map(filter => {
                filters.push({
                    name: filter.column.field,
                    value: filter.value
                })
                return null
            })
        }

        filter = {
            page: filterData.page,
            pageSize: filterData.pageSize,
            search: filterData.search,
            orderBy: filterData.orderBy,
            orderDirection: filterData.orderDirection,
            filters: JSON.stringify(filters),
        }
    }



    return apiConfig.get(`/${type}`, { params: filter })
}
function _create(type, data) {
    return apiConfig.post(`/${type}`, data)
}
function _update(type, id, data) {
    return apiConfig.put(`/${type}/${id}`, data)
}
function _delete(type, id) {
    return apiConfig.delete(`/${type}/${id}`)
}