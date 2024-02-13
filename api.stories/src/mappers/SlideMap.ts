import {Slide as PersistanceSlide} from "@prisma/client";
import {Slide} from "../domain/Slide";

export class SlideMap {
    public static toDomain(raw: PersistanceSlide): Slide | null {
        const slideOrError = Slide.create({
            stories_id: raw.stories_id,
            order: raw.order
        })
        if(slideOrError.isFailure) {
            console.log(slideOrError.errorValue())
            return null
        }
        if(slideOrError.isSuccess) {
            return slideOrError.getValue()!
        }
        return null
    }
    public static toPersistance(slide: Slide): any {
        return {
            id: slide.id.toValue(),
            stories_id: slide.getStoriesId(),
            order: slide.getOrder()
        }
    }
}