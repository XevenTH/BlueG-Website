import { Profile } from "./profile";

export interface Activity {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  isCancelled: boolean,
  hostUserName: string,
  isHosting: boolean,
  isJoined: boolean,
  hostProfile?: Profile,
  attendees: Profile[]
}

export class Activity implements Activity {
  constructor(init?: ActivityFormValues) {
    Object.assign(this, init);
  }
}

export class ActivityFormValues {
  id?: string = undefined;
  title: string = '';
  date: Date | null = null;
  description: string = '';
  category: string = '';
  city: string = '';
  venue: string = '';

  constructor(values?: ActivityFormValues) {
    if (values) {
      this.id = values.id;
      this.title = values.title;
      this.date = values.date;
      this.description = values.description;
      this.category = values.category;
      this.city = values.city;
      this.venue = values.venue;
    }
  }
}