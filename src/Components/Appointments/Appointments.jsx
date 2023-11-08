import React, { useState, useEffect } from "react";
import { deleteAppointments, getAppointments, postAppointments } from "../../MainServices/getPosts";
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cWWdCf1FpTXxbf1xzZFJMYl5bQXJPMyBoS35RdURiWXded3ZdQ2RfUUV0');

import {
  ScheduleComponent,
  Inject,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
let eventsData = []

export const Appointments = () => {
    const [data, setdata] = useState([])
    let testGet = async ()=>{
        let data = await getAppointments()
        eventsData =[...data[0]]
        setdata(eventsData)
    }
    testGet()
  const handleAppointmentAdd = async (args) => {
    if(args.data != undefined){
        if(args.requestType === 'eventCreate'){
            const newAppointment = { ...args.data };
            let AllData = [...eventsData , newAppointment[0]]
            await deleteAppointments()
            await postAppointments(AllData)
            eventsData=AllData;    
        }
        else if (args.requestType === 'eventRemove'){
            let deletedID = args.data[0].Id
            let NewData = eventsData.filter((event)=>event.Id != deletedID)
            await deleteAppointments()
            await postAppointments(NewData)
            eventsData=NewData;    
        }
        else if (args.requestType === 'eventChange'){
            const editedAppointment = args.data;
            const editedId = args.data.Id;
            let NewData = eventsData.filter((event)=>event.Id != editedId)
            let AllData = [...NewData , editedAppointment]
            await deleteAppointments()
            await postAppointments(AllData)
            eventsData=AllData;
        }
    }
  };
  
  return (
    <ScheduleComponent
      eventSettings={{ dataSource: data }}
      actionBegin={handleAppointmentAdd}
    >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
};

export default Appointments;
