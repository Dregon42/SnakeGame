import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Colors } from '../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Coordinate, Direction, GestureEventType } from '../types/types';
import Snake from './Snake';
import { checkGameOver } from '../utils/checkGameOver';
import Food from './Food';
import { checkEatsFood } from '../utils/checkEatsFood';

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5}];
const FOOD_INITIAL_POSITION = { x: 5, y: 20};
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 1000}; 
const MOVE_INTERVALS = 50;
const SCORE_INCREMENT = 10; 

export default function Game(): JSX.Element {
    const [direction, setDirection] = useState<Direction>(Direction.Right);
    const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION); // used "[]" because of SNAKE_INITIAL _POSITION x,y coordinates
    const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isPaused, setIsPaused] =useState<boolean>(false);
    const [score, setScore] =useState<number>(0);
    
    useEffect(() => {
        if (!isGameOver) {
            const intervalId = setInterval(() => {
                !isPaused && moveSnake();
            }, MOVE_INTERVALS)

            return () => clearInterval(intervalId);
        }
    }, [snake, isGameOver, isPaused]) // want to run useEffect when the snake changes, gameover, or game pause

    // this function is for moving the snake every 15 milliseconds
    const moveSnake = () => {
        const snakeHead = snake[0];
        const newSnakeHead = { ...snakeHead} // creating a copy

        // game over
        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver((prev) => !prev);
            return;
        }

        switch (direction) {
            case Direction.Up:
                newSnakeHead.y -= 1;
                break;
            case Direction.Down:
                newSnakeHead.y += 1;
                break;
            case Direction.Left:
                newSnakeHead.x -= 1;
                break;
            case Direction.Right:
                newSnakeHead.x += 1;
        }

        // grow snake if it eats food
        if (checkEatsFood(newSnakeHead, food, 2)) {
            setSnake([newSnakeHead, ...snake]); // add additional snake body after eating

            // get another position for food
            setScore(score + SCORE_INCREMENT); //add to score
        }

        setSnake([newSnakeHead, ...snake.slice(0,-1)]) //remove last element to keep length
    }

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
            <View style={styles.boundaries}>
                <Snake snake={snake}/>
                <Food x={food.x} y={food.y} />
            </View>
        </SafeAreaView>
    </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    boundaries: {
        flex: 1,
        marginTop: 20,
        borderColor: Colors.primary,
        borderWidth: 12,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: Colors.background,
    }
})

