import { supabase } from '../supabaseConfig'

const BUCKET = 'wedding-images'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const prefix = searchParams.get('prefix') ?? ''

        const { data, error } = await supabase.storage
            .from(BUCKET)
            .list(prefix, {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' },
            })

        if (error) {
            console.error('Supabase storage list failed', error)
            return Response.json(
                {
                    message: 'Unable to fetch wedding images',
                    supabaseError: error.message,
                },
                { status: 500 }
            )
        }

        const images = data.map((file) => {
            const path = prefix ? `${prefix}/${file.name}` : file.name
            const { data: publicUrlData } = supabase.storage
                .from(BUCKET)
                .getPublicUrl(path)

            return {
                name: file.name,
                path,
                url: publicUrlData.publicUrl,
                updatedAt: file.updated_at,
                createdAt: file.created_at,
            }
        })

        return Response.json({ images })
    } catch (error) {
        console.error('Unexpected error fetching wedding images', error)
        return Response.json(
            { message: 'Unexpected server error' },
            { status: 500 }
        )
    }
}
