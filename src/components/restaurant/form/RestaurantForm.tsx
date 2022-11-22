import { DocumentData } from "firebase/firestore";
import React, { MouseEventHandler, SyntheticEvent, useState } from "react";
import { upload } from "../../../configs/firebase/actions";
import Input from "../../../lib/form/Input";
import TextArea from "../../../lib/form/TextArea";
import LandingImage from "../../../pages/landing/LandingImage";

export interface formDataInterface {
  name: string;
  shortDescription: string;
  description: string;
  opensAt: string;
  closesAt: string;
  address: string;
  phone: string;
  email: string;
  imageRef: string;
}

const RestaurantForm = (props: {
  onSubmit: Function;
  restaurant?: DocumentData;
  submitActionName: string;
  title: string;
  onCancel: MouseEventHandler;
}) => {
  const [saving, setSaving] = useState(false);
  const { restaurant } = props;
  const [photo, setPhoto] = useState<File | null>(null);

  const photoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(event?.target?.files?.[0] || null);
  };
  const onSubmitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    setSaving(true);
    const target = e.target as typeof e.target & {
      [key: string]: { value: string };
    };
    const name = target.restaurantName.value;
    const shortDescription = target.shortDescription.value;
    const description = target.description.value;
    const address = target.address.value;
    const opensAt = target.opensAt.value;
    const closesAt = target.closesAt.value;
    const phone = target.phone.value;
    const email = target.email.value;
    if (
      !(
        name &&
        shortDescription &&
        description &&
        address &&
        opensAt &&
        closesAt &&
        phone &&
        email
      )
    ) {
      setSaving(false);
      alert("The form is invalid");
    }

    const formData = {
      name,
      shortDescription,
      description,
      address,
      opensAt,
      closesAt,
      phone,
      email,
    };

    if (photo) {
      upload(photo, props.restaurant?.imageRef).then(({ url, ref }) => {
        props.onSubmit({ ...formData, image: url, imageRef: ref });
      });
    } else {
      props.onSubmit(formData);
    }
  };

  return (
    <div>
      <LandingImage />
      <div className="modal-well">
        <div className="mid-board">
          <h1 className="title-style">{props.title}</h1>
          <form onSubmit={onSubmitHandler}>
            <Input
              label="Name"
              type="text"
              value={restaurant?.name || ""}
              name="restaurantName"
            ></Input>
            <Input
              label="Short Description"
              type="text"
              value={restaurant?.shortDescription || ""}
              name="shortDescription"
            ></Input>
            <TextArea
              label="Description"
              value={restaurant?.description || ""}
              name="description"
            />
            <Input
              label="Address"
              type="text"
              value={restaurant?.address || ""}
              name="address"
            ></Input>
            <Input
              label="Opens At"
              type="time"
              value={restaurant?.opensAt || ""}
              name="opensAt"
            ></Input>
            <Input
              label="Closes At"
              type="time"
              value={restaurant?.closesAt || ""}
              name="closesAt"
            ></Input>
            <Input
              label="Phone"
              type="text"
              value={restaurant?.phone || ""}
              name="phone"
            ></Input>
            <Input
              label="Email"
              type="text"
              value={restaurant?.email || ""}
              name="email"
            ></Input>
            <div className="mt-10 d-flex">
              <div className="d-flex w-100">
                <label className="d-block label-style" htmlFor="photo">
                  Restaurant picture:
                </label>
              </div>
              <label className="custom-file-upload w-300">
                <input
                  type="file"
                  name="photo"
                  accept="image/png, image/jpeg"
                  onChange={photoChangeHandler}
                />
                <i className="fa fa-cloud-upload"></i> Upload Photo
                <br />
                {photo ? photo.name : null}
              </label>
            </div>
            <div className="mt-10 d-flex">
              {saving ? (
                <span className="span-style">Saving... Please wait.</span>
              ) : (
                <>
                  <button className="btn-grad" onClick={props.onCancel}>
                    Cancel
                  </button>
                  <button className="btn-grad" type="submit">
                    {props.submitActionName}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RestaurantForm;
