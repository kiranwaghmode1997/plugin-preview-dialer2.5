import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import CustomerComponent from "./components/CustomerComponent/CustomerComponent";
import CustomThemeOverrides from "./CustomThemeOverrides";
import { Icon } from "@twilio/flex-ui";
import { Actions } from "@twilio/flex-ui";
import { WorkerCanvasControls } from "@twilio/flex-ui";
import PreviewButton from "./components/UI/PreviewButton";
import PreviewDialer from "./components/PreviewDialer/PreviewDialer";
import TaskCanvasComponent from "./components/TaskCanvasComponent/TaskCanvasComponent";
import AgentComponent from "./components/AgentComponent/AgentComponent";
//import { API_BASE_URL } from './components/Constants/Constants';
import { CRMContainer } from "@twilio/flex-ui";
import axios from "axios";
import TestComponent from "./components/ListCustomerComponent/TestComponent";
import ListCampaignData from "./components/ListCustomerComponent/ListCampaignData";
const PLUGIN_NAME = "FlexPreviewDialer";

export default class FlexPreviewDialer extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }



  async init(flex, manager) {
    /* UI CHANGES */
    manager.updateConfig({
      colorTheme: {
        overrides: CustomThemeOverrides,
      },
      componentProps: {
        AgentDesktopView: {
          showPanel2: true,
          Panel1: {
            splitterOrientation: "horizontal",
          },
        },
        WorkerCanvas: {
          showSkill: true,
        },
      },
    });

    flex.AgentDesktopView.Panel2.Content.replace(
      <AgentComponent key="agent-component" />,
      { sortOrder: -1 }
    );

    flex.MainHeader.defaultProps.logoUrl =  "https://voicera-financials.s3.amazonaws.com/public/images/VA.png";

    // comment: Unfortunately, the LoginView is not currently supported and the Flex logo can not be replaced/updated. 
    // flex.LoginView.defaultProps.logoUrl =  "https://voicera-financials.s3.amazonaws.com/public/images/VA.png";

    flex.AgentDesktopView.defaultProps.splitterOptions = {
      initialFirstPanelSize: "30%",
      minimumFirstPanelSize: "30%",
      minimumSecondPanelSize: "70%",
    };
    ////customc code rnd///
    // flex.Actions.addListener("afterSetActivity", (payload) => {
    //   if (payload.activityAvailable) {
    //     alert("Agent is now available!");

    //     flex.Actions.addListener("afterSetActivity", (payload) => {
    //       if (payload.activityAvailable) {
    //        // alert("Agent is now available!");
    //         axios({
    //           method: "post",
    //           url: `https://55c1-2402-3a80-40c2-8fd4-fdc8-59eb-2ae6-4c0e.ngrok-free.app/vdl/routerevent`,
    //           data: payload,
    //           headers: { "Content-Type": "application/json;charset=UTF-8" },
    //         })
    //           .then(function (response) {
    //             //handle success
    //             console.log(response);
    //           })
    //           .catch(function (response) {
    //             //handle error
    //             console.log(response);
    //           });

    //       }
    //     })
    //   }
    // })

    //   flex.Actions.registerAction("MyAction", (payload) => {
    //     if (payload.activityAvailable) {
    //       // alert("Agent is now available!");
    //        axios({
    //          method: "post",
    //          url: `https://55c1-2402-3a80-40c2-8fd4-fdc8-59eb-2ae6-4c0e.ngrok-free.app/vdl/routerevent`,
    //          data: payload,
    //          headers: { "Content-Type": "application/json;charset=UTF-8" },
    //        })
    //          .then(function (response) {
    //            //handle success
    //            console.log(response);
    //          })
    //          .catch(function (response) {
    //            //handle error
    //            console.log(response);
    //          });
    //         }
    // });

    flex.Actions.addListener("afterCompleteTask", (payload) => {
      return flex.Actions.invokeAction("MyAction");
    });
    ////till here
    flex.OutboundDialerPanel.Content.add(<PreviewDialer key="preview-dialpad" flex={flex} manager={manager} />)


    const PreviewDialerChannel = flex.DefaultTaskChannels.createChatTaskChannel(
      "Preview Dialer",
      (task) => task.taskChannelUniqueName === "previewdialer"
    );

    // const PreviewDialerChannel = flex.DefaultTaskChannels.createChatTaskChannel(
    //   'voice',
    //   task => task.taskChannelUniqueName === 'voice'
    // );

    PreviewDialerChannel.templates.TaskListItem.firstLine = (task) =>
      task.attributes.name;
    PreviewDialerChannel.templates.TaskCanvasHeader.title = (task) =>
      task.attributes.info.name;
    PreviewDialerChannel.templates.IncomingTaskCanvas.firstLine = (task) =>
      task.attributes.name;
    // PreviewDialerChannel.templates.IncomingTaskCanvas.secondLine = task => task.attributes.info.campaignNam e;

    PreviewDialerChannel.icons.active = (
      <Icon icon="Directory" key="icon-active" />
    );
    PreviewDialerChannel.icons.list = <Icon icon="Directory" key="icon-list" />;
    PreviewDialerChannel.icons.main = <Icon icon="Directory" key="icon-main" />;

    PreviewDialerChannel.addedComponents = [
      {
        target: "TaskListButtons",
        component: <PreviewButton key="preview-component" flex={flex} />,
      },
    ];

    PreviewDialerChannel.replacedComponents = [
      {
        target: "TaskCanvas",
        component: (
          <TaskCanvasComponent key="task-canvas-component" flex={flex} />
        ),
      },
    ];

    PreviewDialerChannel.removedComponents = [
      {
        target: "TaskListButtons",
        key: "reject",
      },
      {
        target: "TaskListButtons",
        key: "accept",
      },
    ];

    flex.TaskChannels.register(PreviewDialerChannel);

    // flex.Actions.addListener("afterAcceptTask", (payload, abortFunction) => {
    //   console.log(`Task Accepted =====>`);
    //   const { type, destination } = payload.task.attributes;

    //   if (type === "preview-dialer") {
    //     console.log(`Task Type =====> ${type}`);
    //     console.log(`Task Destination =====> ${destination}`);
    //     console.log(`Task Sid =====> ${payload.task.sid}`);

    //     flex.Actions.invokeAction("StartOutboundCall", {
    //       destination
    //     });

    //   }
    //   flex.Actions.invokeAction("CompleteTask", { sid: payload.task.sid })
    // });

    flex.Actions.addListener("afterAcceptTask", (payload, abortFunction) => {
      // Only alter chat tasks:
      console.log(`Task Accepted =====>` + payload);
      const { type, destination } = payload.task.attributes;
      console.log("type of task is " + type);

      if (type === "preview-dialer") {
        //   abortFunction(payload);
        // } else {
        return new Promise(function (resolve, reject) {
          // Send the message:
          const response = flex.Actions.invokeAction("StartOutboundCall", {
            destination,
          }).then((response) => {
            // Wait until the message is sent to wrap-up the task:
            //  if(response==="completed"){
            resolve(
              flex.Actions.invokeAction("CompleteTask", {
                sid: payload.task.sid,
              })
            );
            //  }
          });
        });
      }
    });

    flex.Actions.addListener("BeforeCompleteTask", (payload, abortFunction) => {
      const task = payload.task;
      console.log(
        "task Channel name before acceptTask is :: " +
          task.taskChannelUniqueName
      );

      console.log(`Task BeforeCompleteTask =====> ${payload.task.taskSid}`);

      async function BeforeCompleteTaskFunc() {
        console.log("in the BeforeCompleteTaskFunc");
      }
      BeforeCompleteTaskFunc();
    });

    //  flex.Actions.addListener("BeforeCompleteTask", (payload, abortFunction) => {
    //  }

    //  flex.Actions.invokeAction("HangupCall", (payload, abortFunction) => {
    //   console.log(`Task call HangupCall =====> ${payload.task.taskSid}`);
    //   flex.Actions.invokeAction("CompleteTask", { sid: payload.task.sid })
    //  });

    // flex.Actions.addListener("afterCompleteTask", (payload, abortFunction) => {
    //   console.log(`Task Rejected =====> ${payload.task.taskSid}`)
    //   flex.Actions.invokeAction("CompleteTask", { sid: payload.task.sid })
    // })

    flex.Actions.addListener("afterRejectTask", (payload, abortFunction) => {
      console.log(`Task Rejected =====> ${payload.task.taskSid}`);

      const deleteTaskPayload = {
        taskSid: payload.task.taskSid,
      };

      async function deleteTask() {
        const responseDB = await fetch(
          "https://14a0-42-105-134-5.ngrok-free.app/vdl/deleteTask",
          {
            // const responseDB = await fetch('https://0de7-42-105-128-83.in.ngrok.io/vdl/deleteTask', {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            method: "POST",
            body: new URLSearchParams(deleteTaskPayload),
            // headers: {
            //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            //   'Access-Control-Allow-Origin': '*'
            // }
          }
        );
      }

      const { type, destination } = payload.task.attributes;
      console.log("type of task is " + type);
      if (type === "preview-dialer") {
        deleteTask();
      }
    });

    manager.workerClient.on("reservationCreated", (reservation) => {
      console.log(
        `Accept Task Payload[Channel Name] =======> ${reservation.task.taskChannelUniqueName}`
      );

      if (reservation.task.taskChannelUniqueName === "previewdialer") {
        console.log(
          `Accept Task Payload[Campaign Name] =======> ${reservation.task.attributes.info.campaignName}`
        );

        console.log(
          `Accept Task Payload[uniqueID] =======> ${reservation.task.attributes.info.uniqueID}`
        );
        // console.log(`Accept Task Payload[Name] =======> ${reservation.task.attributes.info.name}`);
        console.log(
          `Accept Task Payload[Date Of Birth] =======> ${reservation.task.attributes.info.dob}`
        );
        console.log(
          `Accept Task Payload[Address] =======> ${reservation.task.attributes.info.addr}`
        );
        console.log(
          `Accept Task Payload[State] =======> ${reservation.task.attributes.info.addr_State}`
        );
        console.log(
          `Accept Task Payload[ZipCode] =======> ${reservation.task.attributes.info.addr_ZipCode}`
        );
        console.log(
          `Accept Task Payload[Email] =======> ${reservation.task.attributes.info.email}`
        );

        console.log(
          `Accept Task Payload[Client Name] =======> ${reservation.task.attributes.info.client_NM}`
        );
        console.log(
          `Accept Task Payload[FACS Client Name] =======> ${reservation.task.attributes.info.facs_client_NM}`
        );
        console.log(
          `Accept Task Payload[Guarantor Name] =======> ${reservation.task.attributes.info.guarantor_Name}`
        );
        console.log(
          `Accept Task Payload[Current Display] =======> ${reservation.task.attributes.info.curr_DISP}`
        );
        console.log(
          `Accept Task Payload[Hospital Code] =======> ${reservation.task.attributes.info.HOSP_SVC_CD}`
        );
        console.log(
          `Accept Task Payload[RTE Balance] =======> ${reservation.task.attributes.info.RTE_BAL}`
        );
        console.log(
          `Accept Task Payload[CBR Score] =======> ${reservation.task.attributes.info.CBR_SCORE}`
        );

        const customerInfo = {
          CampaignDashboardTaskingStatusID:
            reservation.task.attributes.info.CampaignDashboardTaskingStatusID,
          // name: reservation.task.attributes.info.name,
          firstName: reservation.task.attributes.info.firstName,
          middleName: reservation.task.attributes.info.middleName,
          lastName: reservation.task.attributes.info.lastName,
          phone1: reservation.task.attributes.info.phone1,
          phone2: reservation.task.attributes.info.phone2,
          landLine: reservation.task.attributes.info.landLine,
          email1: reservation.task.attributes.info.email1,
          email2: reservation.task.attributes.info.email2,
          country: reservation.task.attributes.info.country,
          city: reservation.task.attributes.info.city,
          state: reservation.task.attributes.info.state,
          street: reservation.task.attributes.info.street,
          zip: reservation.task.attributes.info.zip,
          matric1: reservation.task.attributes.info.matric1,
          matric2: reservation.task.attributes.info.matric2,
          matric3: reservation.task.attributes.info.matric3,
          matric4: reservation.task.attributes.info.matric4,
          surveyUrl: reservation.task.attributes.info.surveyUrl,
          // CampaignDashboardTaskingStatusID: reservation.task.attributes.info.CampaignDashboardTaskingStatusID
        };

        flex.AgentDesktopView.Panel2.Content.replace(
          <CustomerComponent
            customerInfo={customerInfo}
            key="customer-component"
          />,
          {
            sortOrder: -1,
          }
        );
      } else if (
        reservation.task.taskChannelUniqueName === "voice" &&
        reservation.task.attributes.direction !== "outbound"
      ) {
        const task = reservation.task;
      const taskAttributes= task.attributes;
        console.log("list data ===================>> ",task)
        console.log("taskAttributes ===================>> ",taskAttributes)
        console.log(
          `Accept Task Payload[ From Country ] =======> ${task.attributes.from_country}`
        );
        const callbackURIval = () => {
          //console.log('task in callbackURIval is :: '+reservation.task)
          return `https://14a0-42-105-134-5.ngrok-free.app/vdl/flexui?CampaignDashboardTaskingStatusID=${task.attributes.CampaignDashboardTaskingStatusID}&contactID=${task.attributes.contactID}&firstName=${task.attributes.firstName}&middleName=${task.attributes.middleName}&lastName=${task.attributes.lastName}&phone1=${task.attributes.phone1}&phone2=${task.attributes.phone2}&landLine=${task.attributes.landLine}&email1=${task.attributes.email1}&email2=${task.attributes.email2}&country=${task.attributes.country}&city=${task.attributes.city}&state=${task.attributes.state}&street=${task.attributes.street}&zip=${task.attributes.zip}&matric1${task.attributes.matric1}&matric2=${task.attributes.matric2}&matric3=${task.attributes.matric3}&matric4=${task.attributes.matric4}&surveyUrl=${task.attributes.surveyUrl}`;
        };

        console.log(
          `task channel is not peview so going in else block =======> ${task.taskChannelUniqueName}`
        );

        // flex.AgentDesktopView.Panel2.Content.replace(
        //   //  <CRMContainer key="listbasedCRMComponent" uri="https://www.bing.com/" />);
        //   <CRMContainer
        //     key="listbasedCRMComponent"
        //     uriCallback={callbackURIval}
        //   />
        // );

flex.AgentDesktopView.Panel2.Content.replace(
          //  <CRMContainer key="listbasedCRMComponent" uri="https://www.bing.com/" />);
          <ListCampaignData key="test-component" data={taskAttributes}/>,
          { sortOrder: -1 }
        );
      }

      reservation.on("completed", (acceptedReservation) => {
        console.log(`Task Completed ======>`);
        console.log(
          "Call direction is :: " + reservation.task.attributes.direction
        );

        if (
          reservation.task.taskChannelUniqueName === "voice" &&
          reservation.task.attributes.direction === "outbound"
        )
          // {
          //   flex.AgentDesktopView.Panel2.Content.replace(
          //     <CustomerComponent customerInfo={customerInfo}
          //       key="customer-component" />, {
          //     sortOrder: -1
          //   });
          // }
          // else
          // {
          //   flex.AgentDesktopView.Panel2.Content.replace(
          //     <AgentComponent
          //       key="agent-component" />, {
          //     sortOrder: -1
          //   });
          // }

          flex.AgentDesktopView.Panel2.Content.replace(
            <AgentComponent key="agent-component" />,
            {
              sortOrder: -1,
            }
          );
      });

      reservation.on("canceled", (acceptedReservation) => {
        console.log(`Task Cancelled ======>`);
        console.log(
          "Call direction is :: " + reservation.task.attributes.direction
        );

        flex.AgentDesktopView.Panel2.Content.replace(
          <AgentComponent key="agent-component" />,
          {
            sortOrder: -1,
          }
        );
      });
    });
  }
}
