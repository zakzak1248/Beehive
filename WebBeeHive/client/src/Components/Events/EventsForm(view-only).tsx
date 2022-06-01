import React from "react";
import TwitterLogo from "../../Images/Twitter_Social_Icon_Rounded_Square_Color.png";
import FacebookLogo from "../../Images/f_logo_RGB-Blue_58.png";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import "../../CSS/Events/EventsForm(view-only).css";
import * as API from "../../api/Event";
import { store, redux_rsvp } from "../../store";
import { getFormattedDate, getFormattedTime } from "../../DateAndTimeFormat";
import { EventInfo2 } from "../../Interfaces";

enum Relation {
  RSVP,
  NotRSVP,
}

interface IProps {
  event: EventInfo2;
  setChange: () => void;
}

function EventsForm({ event, setChange }: IProps) {
  const [displayRSVP, setIsRSVP] = React.useState(false);
  const setRSVP = () => {
    const state = store.getState().state;
    const relation = state.relation;
    if (relation === Relation.RSVP) {
      setIsRSVP(false);
      setChange();
      API.removeRSVP(event.id, state.id);
      event["relation"] = Relation.NotRSVP;
      store.dispatch(redux_rsvp(Relation.NotRSVP));
    } else if (relation === Relation.NotRSVP) {
      API.updateRSVP(event.id, state.id);
      changeIndex();
      setIsRSVP(true);
      setChange();
      event["relation"] = Relation.RSVP;
      store.dispatch(redux_rsvp(Relation.RSVP));
    }
    changeIndex();
  };

  const changeIndex = () => {
    const relation = store.getState().state.relation;

    if (relation === Relation.RSVP) {
      setIsRSVP(true);
      setChange();
    } else if (relation === Relation.NotRSVP) {
      setIsRSVP(false);
      setChange();
    }
  };

  React.useEffect(() => {
    store.subscribe(changeIndex);
  });

  const quote = `Come join me at the ${event.title} event!`;
  const hashtags = ["BeeHive"];

  return (
    <div className="EventsForm-view-only">
      <div className="EventsForm-view-only-Top">
        <div className="EventsForm-view-only-NameAddressTimeDateGroup">
          <div className="EventsForm-view-only-NameDiv">
            <label className="EventsForm-view-only-NameLabel">Name</label>
            <div className="EventsForm-view-only-Name">{event.title}</div>
          </div>
          <div className="EventsForm-view-only-AddressTimeDateGroup">
            <div className="EventsForm-view-only-AddressTimeDateLabel">
              <label className="EventsForm-view-only-AddressLabel">
                Address
              </label>
              <label className="EventsForm-view-only-TimeLabel">Time</label>
              <label className="EventsForm-view-only-DateLabel">Date</label>
            </div>
            <div className="EventsForm-view-only-AddressTimeDateInfo">
              <div className="EventsForm-view-only-Address">
                {event.address}
              </div>
              <div className="EventsForm-view-only-Time">
                {getFormattedTime(event)}
              </div>
              <div className="EventsForm-view-only-Date">
                {getFormattedDate(event)}
              </div>
            </div>
          </div>
        </div>
        <div className="EventsForm-view-only-SocialMediaButtons">
          <TwitterShareButton
            url="http://localhost:3000/"
            title={quote}
            hashtags={hashtags}
          >
            <img
              alt="Twitter Icon"
              className="EventsForm-SocialMediaButtons-Twitter"
              src={TwitterLogo}
            />
          </TwitterShareButton>
          <FacebookShareButton
            url="https://www.google.com/"
            quote={quote}
            hashtag="#BeeHive"
          >
            <img
              alt="Facebook Icon"
              className="EventsForm-SocialMediaButtons-Facebook"
              src={FacebookLogo}
            />
          </FacebookShareButton>
        </div>
      </div>
      <div className="EventsForm-view-only-DescriptionDiv">
        <label className="EventsForm-view-only-DescriptionLabel">
          Description
        </label>
        <div className="EventsForm-view-only-Description">
          {event.description}
        </div>
      </div>
      <div
        className={
          displayRSVP
            ? "EventsForm-view-only-RSVPChecked"
            : "EventsForm-view-only-RSVPUnChecked"
        }
      >
        <form>
          <label className="EventsForm-view-only-RSVPForm">
            RSVP
            <input type="checkbox" checked={displayRSVP} onChange={setRSVP} />
          </label>
        </form>
      </div>
    </div>
  );
}

export default EventsForm;
