import GoHome from "../components/GoHome";
import Layout from "../components/Layout";
import * as z from "zod";

const Intro = z.object({
  title: z.string(),
  durationWeeks: z.number(),
  raceDate: z.optional(z.string())
})
type Intro = z.infer<typeof Intro>;

const WorkoutType = z.literal(["rest", "easy", "tempo", "hills", "long", "timeTrial", "strength"]);

type WorkoutType = z.infer<typeof WorkoutType>;

type WorkoutTypes = {
  [name in WorkoutType]: {
    color: string;
    name: string;
  };
};

type Day = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

type Workout = {
  day: Day;
  type: WorkoutType;
  distance?: number;
  unit?: string;
  description: string;
}

type Week = {
  week: number;
  days: Workout[];
}

type Plan = {
  intro: Intro
  workoutTypes: WorkoutTypes
  weeks: Week[]
}

export const Tools = () => {
  return (
    <Layout verticalSpacing={5}>
      <GoHome text="home" />
      <h1 className="font-display font-semibold text-5xl mt-6 mb-3">
              Runna plan chart
      </h1>
      <textarea placeholder="Paste JSON here!">

      </textarea>
    </Layout>
  );
};

/**
 * ideas -- this is a hybrid workflow of LLM + pasting / React. I could make a end-to-end pipeline if the data was wrong I suppose
 * - paste in JSON to render a chart. later allow upload maybe? paste is more straightforward if I'm just doing this online
 * - should save the JSON to local storage
 * - ways I want to look at the data:
 *   - line chart for total mileage
 *   - stacked bar / stacked line for distance
 *   - adjacent bar for workout types
 * - do some stuff with useEffect and other hooks for practice
 * 
 * blog post: 'the end of data munging' or 'speeding up development for fun' 'spending more time building the fun parts'
 */
