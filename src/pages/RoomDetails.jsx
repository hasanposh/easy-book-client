import React from 'react';
import { useLoaderData } from 'react-router-dom';

const RoomDetails = () => {
    const room = useLoaderData()
    return (
        <div>
            <h2>room {room.name}</h2>
        </div>
    );
};

export default RoomDetails;<h2>room</h2>