import { httpClient } from "./AxiosHelper"

export const createRoomApi= async(roomDetail)=>{
    const responce= await httpClient.post(`/api/v1/rooms`,roomDetail,{
        headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'text/plain'
          }
    })
    return responce.data
}

export const joinRoomApi= async(roomId)=>{
    const responce= await httpClient.get(`/api/v1/rooms/${roomId}`)
    return responce.data
}

export const getMessagessApi= async(roomId)=>{
    const responce= await httpClient.get(`/api/v1/rooms/${roomId}/messages`)
    return responce.data
}