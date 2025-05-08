import Router from "express"
import { convertURL, reDirectURL } from "../controllers/urlShortner.controller.js"

const router = Router()

router.route("/original-short").post(convertURL)
router.route("/:shortId").get(reDirectURL)

export default router