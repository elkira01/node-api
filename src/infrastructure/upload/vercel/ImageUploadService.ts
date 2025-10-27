import AbstractFileUploadService from '../../../application/services/AbstractFileUploadService'
import { put } from '@vercel/blob'
import { StringUtilityService } from '../../../application/services/StringUtilityService'

export class ImageUploadService extends AbstractFileUploadService {
    constructor(
        public target:
            | 'covers'
            | 'profile-images'
            | 'default-images' = 'default-images'
    ) {
        super('', `/${target}`)
    }

    validateFile(file: File): boolean {
        return true
    }

    async uploadFile(file: { name: string; buffer: Buffer }): Promise<string> {
        const blob = await put(
            `${this.storageFolder}/${StringUtilityService.stringToSlug(file.name)}`,
            file.buffer,
            {
                access: 'public',
            }
        )

        return blob.url
    }

    deleteFile(): void {}
}
