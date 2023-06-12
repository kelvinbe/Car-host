import React from "react";
import Gallery from "./Gallery";
import { render, screen } from "@testing-library/react"; 

const images = [
    'https://images.pexels.com/photos/9390250/pexels-photo-9390250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/4031013/pexels-photo-4031013.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3769443/pexels-photo-3769443.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/9130978/pexels-photo-9130978.jpeg?auto=compress&cs=tinysrgb&w=1600',
]
beforeEach(()=>{
    render(<Gallery  images={images}/>)
})
describe('Tests the Gallery Component', ()=>{
    it('Tests if the Gallery component mounts', ()=>{
        expect(screen.getByTestId('Gallery')).toBeInTheDocument()  
    })
})