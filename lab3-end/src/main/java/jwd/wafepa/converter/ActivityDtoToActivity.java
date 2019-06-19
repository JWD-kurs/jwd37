package jwd.wafepa.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import jwd.wafepa.model.Activity;
import jwd.wafepa.service.ActivityService;
import jwd.wafepa.web.dto.ActivityDTO;

@Component
public class ActivityDtoToActivity 
	implements Converter <ActivityDTO, Activity>{
	
	@Autowired
	private ActivityService activityService;

	@Override
	public Activity convert(ActivityDTO source) {
		Activity target;
		if(source.getId() == null) {
			target = new Activity();
		}else {
			target = activityService.findOne(source.getId());
		}
		
		target.setId(source.getId());
		target.setName(source.getName());
		
		return target;
	}
	
	public List<Activity> convert(List<ActivityDTO> source){
		List<Activity> target = new ArrayList<>();
		
		for(ActivityDTO dto: source) {
			Activity a = convert(dto);
			target.add(a);
		}
		
		return target;
	}

}
