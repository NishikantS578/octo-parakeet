import { useLoaderData } from "react-router-dom"
import "./App.css"

export async function loader({ params }: { params: { userId: string } }) {
    if (!params.userId) {
        throw new Response("", { status: 404, statusText: "Invalid UserId" })
    }

    const res = await fetch((import.meta.env.VITE_SERVER_URL || "http://localhost:8001") + `?userId=${params.userId}`)
    const userData = await res.json()
    if (res.status != 200) {
        throw new Response("", { status: 404, statusText: "User Does Not Exists" })
    }

    return userData
}

export default function Dashboard() {
    const userData = useLoaderData()
    return <div id="user-data-card">
        <h1>Dashboard</h1>
        <div className="label">Name: </div>
        <div> {userData.firstName} {userData.lastName}</div>
        <div className="label">Date of Birth: </div>
        <div> {userData.dob}</div>
        <div className="label">Phone Number: </div>
        <div> {userData.dialCode} {userData.phoneNo}</div>
        <div className="label">E-mail: </div>
        <div> {userData.email}</div>
    </div>
}