import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from 'react';

class Timer {
    secondsPassed = 0

    constructor() {
        makeAutoObservable(this)
    }

    increaseTimer() {
        this.secondsPassed += 1
    }
}

const myTimer = new Timer()

export default observer(() => {
    const timer = myTimer;

    useEffect(() => {
        setInterval(() => {
            myTimer.increaseTimer()
        }, 1000);
    }, []);

    return (
        <view>Seconds passed: {timer.secondsPassed}</view>
    );
})
