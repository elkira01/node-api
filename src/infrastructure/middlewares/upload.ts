import multer from 'multer'
import { Request } from 'express'

export const imageUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (
        req: Request,
        file: any,
        cb: (arg0: any, arg1: boolean) => void
    ) => {
        console.log(file.mimetype)
        // Accept images only
        if (file.mimetype.startsWith('image/')) {
            cb(null, true)
        } else {
            cb(new Error('Only image files are allowed!'), false)
        }
    },
})

export const pdfUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (
        req: Request,
        file: any,
        cb: (arg0: any, arg1: boolean) => void
    ) => {
        console.log(file.mimetype)
        // Accept images only
        if (file.mimetype.startsWith('application/pdf')) {
            cb(null, true)
        } else {
            cb(new Error('Only image files are allowed!'), false)
        }
    },
})
