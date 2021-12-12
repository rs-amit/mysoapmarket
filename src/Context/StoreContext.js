import { useContext, useReducer, createContext, useEffect } from "react";

const StateContext = createContext()

export default function StateProvider({ children }) {
    const [state, dispatch] = useReducer(ReducerFunc, {
        // user:null
        user:localStorage.getItem('salesperson') ? JSON.parse(localStorage.getItem('salesperson')) : null,
        isFatching:false,


    })


    useEffect(() => {
        console.log(state?.user)
        localStorage.setItem("salesperson", JSON.stringify(state?.user))
    }, [state?.user])

    return (
        <StateContext.Provider value={{ user: state?.user,isFatching:state?.isFatching, dispatch }}>
            {children}
        </StateContext.Provider>
    );
}


export const StateHandler = () => useContext(StateContext)

const ReducerFunc = (state, action) => {
    switch (action.type) {

        case "LOGIN-BEGIN":
            return {
                state, user: null,
                state, isFatching:true,
            }
        case "LOGIN-SUCCESSFUL":
            return {
                state, user: action.PayLoad,
                state, isFatching:false,
            }

        case "LOGOUT-USER":
            return {
                state, user: null,
                state, isFatching:false,
            }
    }

}