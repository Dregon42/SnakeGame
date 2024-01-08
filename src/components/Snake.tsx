import React, { Fragment } from 'react';
import { Coordinate } from '../types/types';
import { View } from 'react-native';

interface SnakeProps {
    snake: Coordinate[];
}

export default function Snake({ snake }): JSX.Element {
  return (
    <Fragment>
        {snake.map((segment:Coordinate, index:number) => {
            const segmentStyle = {
                
            }

            return (
                <View key={index}/>
            )
        })}
    </Fragment>
  )
}
