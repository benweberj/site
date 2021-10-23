export const generateParameters = settings => {
   let params = {}
   Object.keys(settings).forEach(param => params[param] = settings[param].value)
   return params
}

export const updateParameters = (newParams, curParams, defaultParams) => {
   let updatedParams = curParams
   Object.keys(newParams).forEach(key => {
      const val = newParams[key]
      updatedParams[key] = ((val != null) ? newParams : defaultParams)[key]
   })
   return updatedParams
}