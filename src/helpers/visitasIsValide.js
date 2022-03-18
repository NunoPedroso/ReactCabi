export const visitasIsValide = (visitas) => {
    if (Array.isArray(visitas) === false) {
        if (visitas.count > 0) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}