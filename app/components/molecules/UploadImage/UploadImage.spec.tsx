import React from "react";
import UploadImage from "./UploadImage";
import { render, screen, fireEvent } from "@testing-library/react";

const testFunc = jest.fn()
beforeEach(()=>{
    render(<UploadImage onChange={testFunc} isError={false} images={[]}/>)
})

describe('Tests the UploadImage component', ()=>{
    it('Tests if the component mounts', ()=>{
        expect(screen.getByText('Upload Image')).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
    })

    it('Tests image upload', ()=>{
        fireEvent.change(screen.getByTestId('upload-image'), {target: {value: 'string_url'}})
        expect(testFunc).toBeCalled()
    })
})