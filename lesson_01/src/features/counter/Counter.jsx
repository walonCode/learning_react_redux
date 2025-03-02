import { useSelector,useDispatch } from "react-redux"
import { increment,decrement, reset, incrementByAmount } from "./counterSlice"
import { useState } from "react";

export default function Counter() {
    const count = useSelector((state) => state.counter.count);
    const dispact = useDispatch()
    const [value, setValue] = useState()

    const addValue = Number(value) || 0

    const resetAll = () => {
        setValue(0)
        dispact(reset())
    }

  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
        <p>{count}</p>
        <div>
            <input className="border-2 " type="text" value={value} onChange={(e)=>setValue(e.target.value)} />
        </div>
        <div className="flex item-center justify-center gap-10">
            <button onClick={()=>dispact(increment())}>Add</button>
            <button onClick={()=> dispact(decrement())}>Minus</button>
            <button onClick={()=>resetAll()}>Reset</button>
            <button onClick={() => dispact(incrementByAmount(addValue))}>Add {addValue} </button>
        </div>
    </section>
  )
}
