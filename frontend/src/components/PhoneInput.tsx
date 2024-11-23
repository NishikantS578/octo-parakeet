import CountryCodes from "../assets/countryCodes.json"

export default function PhoneInput(
    props: {
        dialCode: string,
        setDialCode: React.Dispatch<React.SetStateAction<string>>,
        phoneNo: string,
        setPhoneNo: React.Dispatch<React.SetStateAction<string>>
    }
) {
    CountryCodes.sort((a, b) => { return a.code.localeCompare(b.code) })
    return <div id="phone-input">
        <select className='country-code' value={props.dialCode} onChange={(e) => props.setDialCode(e.target.value)}>
            {CountryCodes.map((country: any) => {
                return <option key={country.name} value={country.dial_code} label={country.code + " " + country.dial_code}></option>
            })}
        </select>
        <input id="phone-number" placeholder="Phone Number" value={props.phoneNo} onChange={(e) => props.setPhoneNo(e.target.value.trim())}></input>
    </div>
}