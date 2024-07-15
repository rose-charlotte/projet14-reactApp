import { Link } from "react-router-dom";
import { InputElement } from "../../components/Commons/inputElement/InputElement";
import { SelectElement } from "../../components/Commons/selectElement/SelectElement";
import style from "./Home.module.scss";
import { FormEvent, LegacyRef, useRef, useState } from "react";

import { Modal } from "@rose-charlotte/modal";
import { createEmployee } from "../../data/employeeRepository";

export function Home() {
    const formRef = useRef<HTMLFormElement>();
    const states = [
        {
            name: "Alabama",
            abbreviation: "AL",
        },
        {
            name: "Alaska",
            abbreviation: "AK",
        },
        {
            name: "American Samoa",
            abbreviation: "AS",
        },
        {
            name: "Arizona",
            abbreviation: "AZ",
        },
        {
            name: "Arkansas",
            abbreviation: "AR",
        },
        {
            name: "California",
            abbreviation: "CA",
        },
        {
            name: "Colorado",
            abbreviation: "CO",
        },
        {
            name: "Connecticut",
            abbreviation: "CT",
        },
        {
            name: "Delaware",
            abbreviation: "DE",
        },
        {
            name: "District Of Columbia",
            abbreviation: "DC",
        },
        {
            name: "Federated States Of Micronesia",
            abbreviation: "FM",
        },
        {
            name: "Florida",
            abbreviation: "FL",
        },
        {
            name: "Georgia",
            abbreviation: "GA",
        },
        {
            name: "Guam",
            abbreviation: "GU",
        },
        {
            name: "Hawaii",
            abbreviation: "HI",
        },
        {
            name: "Idaho",
            abbreviation: "ID",
        },
        {
            name: "Illinois",
            abbreviation: "IL",
        },
        {
            name: "Indiana",
            abbreviation: "IN",
        },
        {
            name: "Iowa",
            abbreviation: "IA",
        },
        {
            name: "Kansas",
            abbreviation: "KS",
        },
        {
            name: "Kentucky",
            abbreviation: "KY",
        },
        {
            name: "Louisiana",
            abbreviation: "LA",
        },
        {
            name: "Maine",
            abbreviation: "ME",
        },
        {
            name: "Marshall Islands",
            abbreviation: "MH",
        },
        {
            name: "Maryland",
            abbreviation: "MD",
        },
        {
            name: "Massachusetts",
            abbreviation: "MA",
        },
        {
            name: "Michigan",
            abbreviation: "MI",
        },
        {
            name: "Minnesota",
            abbreviation: "MN",
        },
        {
            name: "Mississippi",
            abbreviation: "MS",
        },
        {
            name: "Missouri",
            abbreviation: "MO",
        },
        {
            name: "Montana",
            abbreviation: "MT",
        },
        {
            name: "Nebraska",
            abbreviation: "NE",
        },
        {
            name: "Nevada",
            abbreviation: "NV",
        },
        {
            name: "New Hampshire",
            abbreviation: "NH",
        },
        {
            name: "New Jersey",
            abbreviation: "NJ",
        },
        {
            name: "New Mexico",
            abbreviation: "NM",
        },
        {
            name: "New York",
            abbreviation: "NY",
        },
        {
            name: "North Carolina",
            abbreviation: "NC",
        },
        {
            name: "North Dakota",
            abbreviation: "ND",
        },
        {
            name: "Northern Mariana Islands",
            abbreviation: "MP",
        },
        {
            name: "Ohio",
            abbreviation: "OH",
        },
        {
            name: "Oklahoma",
            abbreviation: "OK",
        },
        {
            name: "Oregon",
            abbreviation: "OR",
        },
        {
            name: "Palau",
            abbreviation: "PW",
        },
        {
            name: "Pennsylvania",
            abbreviation: "PA",
        },
        {
            name: "Puerto Rico",
            abbreviation: "PR",
        },
        {
            name: "Rhode Island",
            abbreviation: "RI",
        },
        {
            name: "South Carolina",
            abbreviation: "SC",
        },
        {
            name: "South Dakota",
            abbreviation: "SD",
        },
        {
            name: "Tennessee",
            abbreviation: "TN",
        },
        {
            name: "Texas",
            abbreviation: "TX",
        },
        {
            name: "Utah",
            abbreviation: "UT",
        },
        {
            name: "Vermont",
            abbreviation: "VT",
        },
        {
            name: "Virgin Islands",
            abbreviation: "VI",
        },
        {
            name: "Virginia",
            abbreviation: "VA",
        },
        {
            name: "Washington",
            abbreviation: "WA",
        },
        {
            name: "West Virginia",
            abbreviation: "WV",
        },
        {
            name: "Wisconsin",
            abbreviation: "WI",
        },
        {
            name: "Wyoming",
            abbreviation: "WY",
        },
    ];
    const departments = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"];
    const [handleModal, setHandleModal] = useState(false);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);

        createEmployee(data);

        formRef.current?.reset();
        setHandleModal(true);
    };

    return (
        <>
            <header className={style.header}>
                <h1>HRnet</h1>
                <Link to="/employee-list" className={style.link}>
                    View current Employees
                </Link>
            </header>
            <form className={style.form} onSubmit={onSubmit} ref={formRef as LegacyRef<HTMLFormElement>}>
                <h2>Create Employee</h2>
                <div className={style.infoContainer}>
                    <div className={style.adressDiv}>
                        <h3>Personal informations:</h3>
                        <InputElement label="First Name" name="firstName" required />
                        <InputElement label="Last Name" name="lastName" required />
                        <InputElement label="Date of Birth" name="dateofBirth" type="date" required />
                    </div>

                    <div className={style.adressDiv}>
                        <h3>Adress:</h3>
                        <InputElement label="Street" name="street" required />
                        <InputElement label="City" name="city" required />
                        <SelectElement name="state" label="State" options={states.map(state => state.name)} required />
                        <InputElement label="Zip Code" name="zipCode" required />
                    </div>
                    <div className={style.adressDiv}>
                        <h3>Other informations:</h3>
                        <SelectElement
                            name="department"
                            label="Department"
                            options={departments.map(department => department)}
                            required
                        />
                        <InputElement label="Start Date" name="startDate" type="date" required />
                    </div>
                </div>
                <button className={style.saveBtn}>Save</button>

                {handleModal && (
                    <Modal
                        open={true}
                        title="Success"
                        children={<span>Employee Created!</span>}
                        styles={{
                            dialog: { className: style.dialog },
                            container: { className: style.container },
                            title: { style: { fontSize: "25px" } },
                            closeButton: { className: style.closeBtn },
                        }}
                    />
                )}
            </form>
        </>
    );
}
