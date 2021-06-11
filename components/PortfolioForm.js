import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";

const PortfolioForm = ({onSubmit, initialData = {}}) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues: initialData});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    

    const handleDateChange = (dateType, setDate) => date => {
        setValue(dateType, date);
        setDate(date);
    }

    useEffect(() => {
        register("startDate");
        register("endDate");
    }, [register])

    useEffect(() => {
        const { startDate, endDate } = initialData;
        if(startDate) { setStartDate(new Date(startDate))}
        if(endDate) { setEndDate(new Date(endDate))}
    }, [initialData])

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                {...register("title")}
                name="title"
                type="text"
                className="form-control"
                id="title"/>
            </div>

            <div className="form-group">
                <label htmlFor="city">Company</label>
                <input
                {...register("company")}
                name="company"
                type="text"
                className="form-control"
                id="company"/>
            </div>

            <div className="form-group">
                <label htmlFor="city">Company Website</label>
                <input
                {...register("companyWebsite")}
                name="companyWebsite"
                type="text"
                className="form-control"
                id="companyWebsite"/>
            </div>

            <div className="form-group">
                <label htmlFor="street">Location</label>
                <input
                {...register("location")}
                name="location"
                type="text"
                className="form-control"
                id="location"/>
            </div>

            <div className="form-group">
                <label htmlFor="street">Job Title</label>
                <input
                {...register("jobTitle")}
                name="jobTitle"
                type="text"
                className="form-control"
                id="jobTitle"/>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                {...register("description")}
                name="description"
                rows="5"
                type="text"
                className="form-control"
                id="description">
                </textarea>
            </div>

            <div className="form-group">
                <label htmlFor="street">Start Date</label>
                <div>
                <DatePicker {...register("startDate")} className="form-control" name="startDate" selected={startDate} onChange={handleDateChange('startDate', setStartDate)} />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="street">End Date</label>
                <div>
                <DatePicker {...register("endDate")} className="form-control" selected={endDate} onChange={handleDateChange('endDate', setEndDate)} />
                </div>
            </div>
            <button
                type="submit"
                className="btn btn-primary">Create
            </button>
        </form>
    )

}

export default PortfolioForm;