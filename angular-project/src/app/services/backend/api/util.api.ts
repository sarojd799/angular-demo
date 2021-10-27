


export const UTIL_API = {
    getAllCountries: function () {
        return `/api/getAllCountries`
    },

    getAllStatesOfCountry: function (countryId: number) {
        return `/api/${countryId}/getAllStatesOfCountry`
    },

    getAllCitiesOfState: function (stateId: number) {
        return `/api/${stateId}/getAllCitiesOfState`
    }
}