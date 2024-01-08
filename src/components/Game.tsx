import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Colors } from '../styles/colors'
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Coordinate, Direction, GestureEventType } from '../types/types';

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5}];
const FOOD_INITIAL_POSITION = { x: 5, y: 20};
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63}; //
const MOVE_INTERVALS = 50;
const SCORE_INCREMENT = 10; 

export default function Game(): JSX.Element {
    const [direction, setDirection] = useState<Direction>(Direction.Right);
    const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION); // used "[]" because of SNAKE_INITIAL _POSITION x,y coordinates
    const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver, setISGameOver] = useState<boolean>(false);
    const [isPaused, setIsPaused] =useState<boolean>(false)

    const handleGesture = (event:GestureEventType) => {
        // console.log(event.nativeEvent) // Log of X,Y axis data
        const {translationX, translationY} = event.nativeEvent;
        console.log(translationX,translationY);

        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                // moving right
                setDirection(Direction.Right);
            } else {
                // moving left
                setDirection(Direction.Left)
            }
        } else {
            if (translationY > 0) {
                // moving down
                setDirection(Direction.Down)
            } else {
                // moving up
                setDirection(Direction.Up)
            }
        }
    }

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
        <SafeAreaView style={styles.container}>
    
        </SafeAreaView>
    </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
})

