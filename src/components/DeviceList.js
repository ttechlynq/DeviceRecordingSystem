import { useEffect } from "react";
import { DetailsList } from "@fluentui/react/lib/DetailsList";

const columns = [
  {
    key: "edit",
    name: "Edit",
    fieldName: "edit",
    minWidth: 30,
    maxWidth: 200,
    isResizeable: true,
  },
  {
    key: "dname",
    name: "Device Name",
    fieldName: "dname",
    minWidth: 90,
    maxWidth: 200,
    isResizeable: true,
  },
  {
    key: "dtype",
    name: "Device Type",
    fieldName: "dtype",
    minWidth: 90,
    maxWidth: 200,
    isResizeable: true,
  },
  {
    key: "condition",
    name: "Device Condition",
    fieldName: "condition",
    minWidth: 90,
    maxWidth: 200,
    isResizeable: true,
  },
  {
    key: "email",
    name: "Email Contact",
    fieldName: "email",
    minWidth: 130,
    maxWidth: 200,
    isResizeable: true,
  },
  {
    key: "delete",
    name: "Delete",
    fieldName: "delete",
    minWidth: 50,
    maxWidth: 200,
    isResizeable: true,
  },
];

let items = [];

export default function DeviceList(props) {
  useEffect(() => {
    if (props.action === "edit") {
      const currentDevice = items.filter(
        (item) => item.key === props.selectedDeviceID
      )[0];
      props.setSelectedDevice(currentDevice.condition);
    }
  }, [props]);

  useEffect(() => {
    if (props.action === "delete") {
      const deleteItem = items.filter(
        (item) => item.key === props.selectedDeviceID
      )[0];
      items = items.filter((item) => item !== deleteItem);
      props.restoreDevices(deleteItem.condition);
    }
    //Update Device
    const curDeviceKey = props.deviceDetails.key;
    if (curDeviceKey) {
      const x = items.findIndex((item) => item.key === curDeviceKey);
      if (x > -1) {
        items = items.map((item) =>
          item.key === curDeviceKey ? props.deviceDetails : item
        );
      } else {
        items = [...items, props.deviceDetails];
      }
      props.deviceDetails.condition = props.chosenOption;
      props.setNewQuantity(props.currentQuantity - 1);
      props.setDeviceDetails({});
    }
  }, [props]);

  return (
    <div className="deviceList">
      <DetailsList items={items} columns={columns} />
    </div>
  );
}
