package com.example.demo.model;

public class SkillCount {

    private String skill;
    private long count;

    public SkillCount(String skill, long count) {
        this.skill = skill;
        this.count = count;
    }

    public String getSkill() {
        return skill;
    }

    public long getCount() {
        return count;
    }
}