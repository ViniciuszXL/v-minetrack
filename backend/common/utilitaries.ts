class Utilitaries {

    isArray(object) {
        return object instanceof Array ? true : false;
    }

}

export const utilitaries = new Utilitaries();