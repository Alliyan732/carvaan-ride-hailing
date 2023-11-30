
import { auth, db } from "../../../config/firebase";


// export const currentUser = "JJXOjhhKkhQ6DX3sGh1lygqACGR2";

// export const currentRide = "FYfSqBU5JgSP2GUilJmz";

export const currentUser = auth.currentUser.uid;

export const currentRide = auth.currentUser.uid;