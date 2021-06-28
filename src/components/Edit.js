import React,{useState} from 'react'

function Edit({handelEdit}) {
    const [textChange, setTextChange] = useState('');
    const [complete, setComplete] = useState(false);

    const onEdit = (e) => {
        console.log('tatatataat');
        e.preventDefault();
        // if(!textChange){
        //     alert('Please add a text')
        // }
        handelEdit({textChange,complete})
        setTextChange('')
        setComplete(false)
    }


    return (
        <>
            <input type="text" value={textChange} onChange={(e) => {setTextChange(e.target.value)}}  
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === 'Escape') {
                onEdit(event)
                console.log("success");
                event.preventDefault()
                event.stopPropagation()
              }
            }}
            />
        </>
    )
}

export default Edit
